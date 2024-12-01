// import Searchs from '../../components/filed/Searchs';
import styles from './events.module.css';
import Tiles from '../../components/Titles/Tiles';
import Calendars from './calendar/Calendars';
import { useEffect, useState } from 'react';
import { getAllEvents } from '../../services/apiEvent';

export default function Events() {
  const [events, setEvents] = useState([]);
  const fetchEvents = async () => {
    try {
      const res = await getAllEvents();
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className={`${styles.employee}`}>
      <Tiles texts="Event" fontSize={23} fontWeight={700} />

      <Calendars events={events} />
    </div>
  );
}
