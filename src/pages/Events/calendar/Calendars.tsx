import { Calendar, Modal, Badge, Button } from 'antd';
import { useState } from 'react';
import styles from './calendar.module.css';
import dayjs from 'dayjs';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const EventCell = ({ event }: { event: any }) => {
  return (
    <>
      <li
        className={`${styles.eventItem} 
      ${
        event.type == 1
          ? styles.success
          : event.type == 2
          ? styles.processing
          : event.type == 3
          ? styles.default
          : styles.error
      }`}
      >
        <Badge color="#ffffff" />
        <span style={{ marginLeft: 8 }}>{event.title}</span>
      </li>
      {/* <Modal
        className="modal"
        title="Event Detail"
        open={isModalVisible}
        centered
        onCancel={handleCancel}
        width={500}
        footer={false}
      >
        <div className={styles.detailEvent}>
          <p>Event Name: {event.title}</p>
          <p>Start Time: {formattedStart}</p>
          <p>End Time: {formattedEnd}</p>
        </div>
        <div className="buttonBox">
          <Buttons texts="Close" status="cancel" handleClick={handleCancel} />
        </div>
      </Modal> */}
    </>
  );
};

const Calendars = ({ events }: { events: Event[] }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const formatDate = (date: any) => date.format('MM/DD/YYYY');

  const getEventsForDate = (current: any) => {
    const formattedDate = formatDate(current);
    return events.filter((event) => event.start?.includes(formattedDate));
  };

  const dateCellRender = (current: any) => {
    const listData = getEventsForDate(current);
    return (
      <ul className={styles.eventContainer}>
        {listData.map((item) => (
          <EventCell event={item} key={item.id} />
        ))}
      </ul>
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  const handlePreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const onPanelChange = (date: any) => {
    setCurrentDate(date);
  };

  const cellRender = (current: any, info: { type: string; originNode: React.ReactNode }) => {
    if (info.type === 'date') {
      return dateCellRender(current);
    }
    return info.originNode;
  };

  return (
    <>
      <Calendar
        className={styles.calendar}
        cellRender={cellRender}
        mode="month"
        value={currentDate}
        onPanelChange={onPanelChange}
      />
      <Button className={`${styles.navigateBtn} ${styles.previousBtn}`} onClick={handlePreviousMonth}>
        <LeftOutlined />
      </Button>
      <Button className={`${styles.navigateBtn} ${styles.nextBtn}`} onClick={handleNextMonth}>
        <RightOutlined />
      </Button>
    </>
  );
};

export default Calendars;
