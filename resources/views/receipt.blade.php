<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Receipt - Order #{{ $order->id }}</title>
    <style>
        body {
            font-family: 'Courier New', monospace;
            margin: 0;
            padding: 20px;
            background: white;
            color: black;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .details {
            margin-bottom: 20px;
        }
        .details p {
            margin: 5px 0;
        }
        .items {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 20px;
        }
        .items th, .items td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
        }
        .items th {
            background: #f0f0f0;
        }
        .total {
            text-align: right;
            font-weight: bold;
            font-size: 18px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>STORE RECEIPT</h1>
        <p>Order #{{ str_pad($order->id, 3, '0', STR_PAD_LEFT) }}</p>
    </div>

    <div class="details">
        <p><strong>Date:</strong> {{ $order->created_at->format('Y-m-d H:i:s') }}</p>
        <p><strong>Staff:</strong> {{ $order->user->name }}</p>
        <p><strong>Status:</strong> {{ ucfirst($order->status) }}</p>
    </div>

    <table class="items">
        <thead>
            <tr>
                <th>Product ID</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach($order->items as $item)
            <tr>
                <td>{{ $item['product_id'] }}</td>
                <td>{{ $item['quantity'] }}</td>
                <td>₦{{ number_format($item['price'], 2) }}</td>
                <td>₦{{ number_format($item['price'] * $item['quantity'], 2) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="total">
        <p>Total: ₦{{ number_format($order->total, 2) }}</p>
    </div>

    <div class="footer">
        <p>Thank you for your business!</p>
    </div>
</body>
</html>