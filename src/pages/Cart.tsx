
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { X, ShoppingBag, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '@/lib/utils';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
        <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="text-gray-500 mt-2 mb-6">Looks like you haven't added any tickets to your cart yet.</p>
        <Button onClick={() => navigate('/')}>Browse Events</Button>
      </div>
    );
  }

  const handleCheckout = () => {
    // In a real app, this would navigate to a checkout page or process
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card key={item.eventId} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    <div className="w-full sm:w-1/4 h-32 sm:h-auto">
                      <img 
                        src={item.event.imageUrl} 
                        alt={item.event.title}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-lg">{item.event.title}</h3>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeFromCart(item.eventId)}
                          className="h-8 w-8"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {formatDate(item.event.date)} • {item.event.time} • {item.event.venue}
                      </p>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">Quantity:</span>
                          <div className="flex items-center">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.eventId, Math.max(1, item.quantity - 1))}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </Button>
                            <Input
                              type="number"
                              min="1"
                              max={item.event.availableTickets}
                              value={item.quantity}
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (!isNaN(value) && value > 0) {
                                  updateQuantity(item.eventId, Math.min(item.event.availableTickets, value));
                                }
                              }}
                              className="w-14 h-8 mx-2 text-center"
                            />
                            <Button 
                              variant="outline" 
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(
                                item.eventId,
                                Math.min(item.event.availableTickets, item.quantity + 1)
                              )}
                              disabled={item.quantity >= item.event.availableTickets}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">₹{(item.event.price * item.quantity).toLocaleString()}</div>
                          <div className="text-xs text-gray-500">₹{item.event.price.toLocaleString()} each</div>
                        </div>
                      </div>
                      {item.quantity >= item.event.availableTickets && (
                        <div className="flex items-center text-amber-600 text-sm mt-2">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          <span>Max tickets available</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6">
            <Button variant="outline" onClick={clearCart}>Clear Cart</Button>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Booking Fee</span>
                  <span>₹0</span>
                </div>
              </div>
              
              <div className="border-t pt-2 mb-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
              
              <Button className="w-full" size="lg" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
              
              <p className="text-xs text-gray-500 mt-4">
                By proceeding, you agree to our terms of service and privacy policy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
