import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private readonly logger = new Logger(FirebaseService.name);
  private app: admin.app.App | null = null;

  constructor(private config: ConfigService) {}

  onModuleInit() {
    const projectId = this.config.get<string>('FIREBASE_PROJECT_ID');
    const clientEmail = this.config.get<string>('FIREBASE_CLIENT_EMAIL');
    const privateKey = this.config.get<string>('FIREBASE_PRIVATE_KEY');

    if (!projectId || !clientEmail || !privateKey) {
      this.logger.warn('Firebase credentials not configured — push notifications disabled');
      return;
    }

    this.app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
    });

    this.logger.log('Firebase Admin SDK initialized');
  }

  async sendToTokens(
    tokens: string[],
    title: string,
    body: string,
    data?: Record<string, string>,
  ): Promise<string[]> {
    if (!this.app || tokens.length === 0) return [];

    const message: admin.messaging.MulticastMessage = {
      tokens,
      notification: { title, body },
      data,
      apns: {
        payload: { aps: { sound: 'default' } },
      },
      android: {
        priority: 'high',
        notification: { sound: 'default' },
      },
    };

    try {
      const response = await this.app.messaging().sendEachForMulticast(message);

      const failedTokens: string[] = [];
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          const code = resp.error?.code;
          if (
            code === 'messaging/registration-token-not-registered' ||
            code === 'messaging/invalid-registration-token'
          ) {
            failedTokens.push(tokens[idx]);
          }
          this.logger.warn(`FCM send failed for token ${idx}: ${resp.error?.message}`);
        }
      });

      this.logger.log(
        `FCM sent: ${response.successCount} success, ${response.failureCount} failed`,
      );

      return failedTokens;
    } catch (error) {
      this.logger.error('FCM multicast failed', error);
      return [];
    }
  }
}
