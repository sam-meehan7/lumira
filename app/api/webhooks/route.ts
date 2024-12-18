import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ received: true });
}

// import { NextResponse } from 'next/server';
// import Stripe from 'stripe';
// import { stripe } from '@/utils/stripe/config';
// import {
//   upsertProductRecord,
//   upsertPriceRecord,
//   manageSubscriptionStatusChange,
//   deleteProductRecord,
//   deletePriceRecord,
//   createOrRetrieveCustomer
// } from '@/utils/supabase/admin';

// const relevantEvents = new Set([
//   'product.created',
//   'product.updated',
//   'product.deleted',
//   'price.created',
//   'price.updated',
//   'price.deleted',
//   'checkout.session.completed',
//   'customer.subscription.created',
//   'customer.subscription.updated',
//   'customer.subscription.deleted',
//   'customer.created'
// ]);

// export async function POST(req: Request) {
//   const body = await req.text();
//   const sig = req.headers.get('stripe-signature') as string;
//   const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
//   let event: Stripe.Event;

//   try {
//     if (!sig || !webhookSecret)
//       throw new Error('Missing signature or webhook secret');
//     event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
//   } catch (err: any) {
//     console.error(`Webhook Error: ${err.message}`);
//     return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
//   }

//   console.log(`🔔 Webhook received: ${event.type}`);

//   if (relevantEvents.has(event.type)) {
//     try {
//       switch (event.type) {
//         case 'product.created':
//         case 'product.updated':
//           await upsertProductRecord(event.data.object as Stripe.Product);
//           break;
//         case 'product.deleted':
//           await deleteProductRecord(event.data.object as Stripe.Product);
//           break;
//         case 'price.created':
//         case 'price.updated':
//           await upsertPriceRecord(event.data.object as Stripe.Price);
//           break;
//         case 'price.deleted':
//           await deletePriceRecord(event.data.object as Stripe.Price);
//           break;
//         case 'customer.subscription.created':
//         case 'customer.subscription.updated':
//         case 'customer.subscription.deleted':
//           const subscription = event.data.object as Stripe.Subscription;
//           await manageSubscriptionStatusChange(
//             subscription.id,
//             subscription.customer as string,
//             event.type === 'customer.subscription.created'
//           );
//           break;
//         case 'checkout.session.completed':
//           const checkoutSession = event.data.object as Stripe.Checkout.Session;
//           if (checkoutSession.mode === 'subscription') {
//             const subscriptionId = checkoutSession.subscription;
//             await manageSubscriptionStatusChange(
//               subscriptionId as string,
//               checkoutSession.customer as string,
//               true
//             );
//           }
//           break;
//         case 'customer.created':
//           const customer = event.data.object as Stripe.Customer;
//           await createOrRetrieveCustomer({
//             uuid: customer.metadata.supabaseUUID,
//             email: customer.email || ''
//           });
//           break;
//         default:
//           throw new Error('Unhandled relevant event!');
//       }
//     } catch (error) {
//       console.error(`Error processing ${event.type}:`, error);
//       return new NextResponse(
//         `Webhook Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
//         { status: 400 }
//       );
//     }
//   }

//   return NextResponse.json({ received: true });
// }
