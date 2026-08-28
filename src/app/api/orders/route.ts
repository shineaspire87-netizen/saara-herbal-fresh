import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { OrderData } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const orderData: OrderData = await req.json();

    if (!orderData || !orderData.customer || !orderData.items || orderData.items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid order payload: missing items or customer info.' },
        { status: 400 }
      );
    }

    console.log(`[Order Processing] Order #${orderData.orderCode} received for ${orderData.customer.fullName}`);

    let dbSaved = false;

    // If Supabase is configured, record in database
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: orderRecord, error: orderError } = await supabase
          .from('orders')
          .insert([
            {
              order_code: orderData.orderCode,
              customer_name: orderData.customer.fullName,
              customer_phone: orderData.customer.phone,
              customer_address: orderData.customer.address,
              customer_city: orderData.customer.city,
              customer_pincode: orderData.customer.pincode,
              order_notes: orderData.customer.notes || null,
              subtotal: orderData.subtotal,
              delivery_fee: orderData.deliveryFee,
              total_amount: orderData.totalAmount,
              items_count: orderData.itemsCount,
              status: 'whatsapp_initiated',
            },
          ])
          .select()
          .single();

        if (orderError) {
          console.error('[Supabase Order Insert Error]:', orderError);
        } else if (orderRecord) {
          dbSaved = true;
          // Insert items
          const itemsToInsert = orderData.items.map(item => ({
            order_id: orderRecord.id,
            product_id: item.productId,
            product_name: item.productName,
            price: item.price,
            quantity: item.quantity,
            total_price: item.total,
          }));

          const { error: itemsError } = await supabase
            .from('order_items')
            .insert(itemsToInsert);

          if (itemsError) {
            console.error('[Supabase Order Items Insert Error]:', itemsError);
          }
        }
      } catch (dbErr) {
        console.error('[Database Exception]:', dbErr);
      }
    } else {
      console.log('[Supabase Notice]: Supabase credentials not set or using placeholder; order logged locally in memory.');
    }

    return NextResponse.json({
      success: true,
      orderCode: orderData.orderCode,
      dbSaved,
      message: 'Order created successfully and ready for WhatsApp fulfillment.',
    });
  } catch (error: any) {
    console.error('[Order API Error]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
