
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { sampleEvents } from '@/data/sampleEvents';
import { Calendar, Clock, MapPin, Ticket } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const event = sampleEvents.find(event => event.id === id);
  
  if (!event) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Event not found</h2>
        <p className="mt-2 text-gray-600">The event you're looking for might have been removed or doesn't exist.</p>
        <Button className="mt-4" onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(event, quantity);
  };

  const handleBuyNow = () => {
    addToCart(event, quantity);
    window.location.href = '/cart';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Event details */}
        <div className="lg:col-span-2">
          <div className="rounded-lg overflow-hidden h-96 mb-6">
            <img 
              src={event.imageUrl} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{new Date(event.date).toLocaleDateString('en-US', { 
                weekday: 'long',
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              <span>{event.time}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{event.venue}</span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h2 className="text-xl font-semibold mb-2">About This Event</h2>
            <p className="text-gray-700">{event.description}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Location</h2>
            <div className="rounded-lg overflow-hidden h-64 bg-gray-200">
              {/* Here you would typically add a Google Map */}
              <div className="flex items-center justify-center h-full text-gray-500">
                <MapPin className="w-6 h-6 mr-2" />
                <span>Map loading...</span>
              </div>
            </div>
            <p className="mt-2 text-gray-600">{event.venue}</p>
          </div>
        </div>
        
        {/* Right column - Ticket purchase */}
        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Get Tickets</h3>
              
              <div className="mb-4">
                <div className="font-medium">Price</div>
                <div className="text-2xl font-bold">₹{event.price.toLocaleString()}</div>
                <div className="text-sm text-gray-500">{event.availableTickets} tickets left</div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="quantity" className="block mb-2 text-sm font-medium">
                  Quantity
                </label>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={event.availableTickets}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.min(event.availableTickets, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="mx-2 text-center"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setQuantity(Math.min(event.availableTickets, quantity + 1))}
                    disabled={quantity >= event.availableTickets}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between py-2 border-t border-b my-4">
                <span>Total</span>
                <span className="font-bold">₹{(event.price * quantity).toLocaleString()}</span>
              </div>
              
              <div className="space-y-2">
                <Button className="w-full" onClick={handleBuyNow}>
                  <Ticket className="mr-2 h-4 w-4" />
                  Buy Now
                </Button>
                <Button variant="outline" className="w-full" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
