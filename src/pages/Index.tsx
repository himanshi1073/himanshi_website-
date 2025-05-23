
import React from 'react';
import Hero from '@/components/Hero';
import EventList from '@/components/EventList';
import { sampleEvents } from '@/data/sampleEvents';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Trending Events</h2>
            <p className="text-muted-foreground">Discover the most popular events happening near you</p>
          </div>
          <Link to="/events">
            <Button variant="outline" className="mt-4 md:mt-0">View all events</Button>
          </Link>
        </div>
        
        <EventList events={sampleEvents.slice(0, 3)} />
        
        <div className="mt-16">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Upcoming Events</h2>
              <p className="text-muted-foreground">Don't miss out on these exciting upcoming events</p>
            </div>
          </div>
          
          <EventList events={sampleEvents.slice(3, 6)} />
        </div>
        
        <div className="mt-16 py-10 bg-gray-50 rounded-lg flex flex-col items-center text-center px-4">
          <h3 className="text-2xl font-bold">Want to host your own event?</h3>
          <p className="text-gray-600 mt-2 max-w-2xl">
            List your event on TicketMaster and reach thousands of potential attendees.
            We handle the ticketing process so you can focus on creating an amazing experience.
          </p>
          <Button className="mt-6" size="lg">
            Become an Organizer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
