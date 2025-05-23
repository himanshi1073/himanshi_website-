
import React, { useState } from 'react';
import EventCard from './EventCard';
import { Event } from '@/types';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

interface EventListProps {
  events: Event[];
  isLoading?: boolean;
}

const EventList: React.FC<EventListProps> = ({ events, isLoading = false }) => {
  const [visibleEvents, setVisibleEvents] = useState<Event[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Initialize visible events when the component mounts or events change
  React.useEffect(() => {
    setVisibleEvents(events);
  }, [events]);

  // Filter events by category
  const filterEvents = (category: string) => {
    setActiveFilter(category);
    if (category === 'all') {
      setVisibleEvents(events);
    } else {
      setVisibleEvents(events.filter(event => event.category === category));
    }
  };

  // Get unique categories
  const categories = ['all', ...new Set(events.map(event => event.category))];

  if (isLoading) {
    return (
      <div>
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-10 w-24 rounded-full" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="h-80 rounded-md" />
          ))}
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-8 animate-fade-in">
        <h3 className="text-xl font-semibold">No events found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category filter buttons */}
      <div className="flex gap-2 mb-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeFilter === category ? "default" : "outline"}
            size="sm"
            className="rounded-full transition-all duration-300 whitespace-nowrap"
            onClick={() => filterEvents(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>

      {/* Events grid with animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleEvents.map((event, index) => (
          <div
            key={event.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <EventCard event={event} />
          </div>
        ))}
      </div>

      {/* Empty state when filters return no results */}
      {visibleEvents.length === 0 && (
        <div className="text-center py-8 animate-fade-in">
          <h3 className="text-xl font-semibold">No events match your filter</h3>
          <p className="text-gray-500 mt-2">Try selecting a different category</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => filterEvents('all')}
          >
            Show all events
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventList;
