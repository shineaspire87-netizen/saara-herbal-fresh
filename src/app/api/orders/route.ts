import { NextResponse } from 'next/server';
import { getSafeSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = getSafeSupabase();

    if (supabase) {
      try {
        await supabase.from('orders').insert([
          {
            order_code: body.orderCode,
            customer_name: body.customer?.fullName,
            customer_phone: body.customer?.phone,
            delivery_address: body.customer?.address,
            city: body.customer?.city,
            pincode: body.customer?.pincode,
            items: body.items,
            total_amount: body.totalAmount,
            status: 'pending',
            created_at: new Date().toISOString(),
          },
        ]);
      } catch (dbError) {
        console.error('Database write error:', dbError);
      }
    }

    return NextResponse.json({ success: true, orderCode: body.orderCode });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: true, message: 'Order handled' });
  }
}
