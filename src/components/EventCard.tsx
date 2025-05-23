
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Event } from "@/types";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.imageUrl || "/placeholder.svg"}
          alt={event.title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs">
          {event.category}
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl line-clamp-1">{event.title}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-sm">
          <span>{event.venue}</span>
          <span className="mx-1">•</span>
          <span>{new Date(event.date).toLocaleDateString()}, {event.time}</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-2 text-sm">{event.description}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center pt-2">
        <div className="font-semibold">₹{event.price}</div>
        <Button onClick={handleViewDetails} className="gap-1">
          <Ticket className="h-4 w-4" />
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
