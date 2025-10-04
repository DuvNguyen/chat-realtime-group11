// src/services/sqs.js
// No-op SQS helpers so backend chạy được khi chưa cấu hình AWS
export async function sendToQueue() {
  // intentionally empty
}

export async function startQueueConsumer() {
  // intentionally empty
}

/*
import { SQSClient, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand } from "@aws-sdk/client-sqs";

const region = process.env.AWS_REGION;
const queueUrl = process.env.SQS_QUEUE_URL;

let sqs = null;
if (region && queueUrl) sqs = new SQSClient({ region });

export async function sendToQueue(message) {
  if (!sqs) return;
  await sqs.send(new SendMessageCommand({
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(message),
  }));
}

export async function startQueueConsumer(onMessage) {
  if (!sqs) return;
  async function poll() {
    try {
      const resp = await sqs.send(new ReceiveMessageCommand({
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 5,
        WaitTimeSeconds: 10,
      }));
      for (const m of resp.Messages || []) {
        try {
          const body = JSON.parse(m.Body);
          await onMessage?.(body);
        } finally {
          await sqs.send(new DeleteMessageCommand({ QueueUrl: queueUrl, ReceiptHandle: m.ReceiptHandle }));
        }
      }
    } catch {}
    setImmediate(poll);
  }
  poll();
}
*/