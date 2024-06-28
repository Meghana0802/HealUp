import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Journal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentEntry, setCurrentEntry] = useState({ title: "", content: "", date: new Date() });
  const [isEditing, setIsEditing] = useState(false);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    fetchEntries();
    fetchQuote();
  }, []);

  const fetchEntries = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const res = await axios.get('http://localhost:5000/api/journal', config);
      setEntries(res.data);
    } catch (err) {
      console.error('Error fetching journal entries: ', err);
    }
  };

  const fetchQuote = async () => {
    try {
      const res = await axios.get("https://api.quotable.io/random");
      setQuote(res.data.content);
    } catch (err) {
      console.error("Error fetching quote: ", err);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const entry = entries.find((e) => new Date(e.date).toDateString() === date.toDateString());
    setCurrentEntry(entry || { title: "", content: "", date });
    setIsEditing(!!entry);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      console.log(currentEntry._id);
      const token = localStorage.getItem('token');
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/journal/${currentEntry._id}`, currentEntry, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
      } else {
        await axios.post("http://localhost:5000/api/journal", currentEntry, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
      }
      fetchEntries();
      setIsEditing(true);
    } catch (err) {
      console.error("Error saving journal entry: ", err);
    }
  };

  const handleDelete = async () => {
    try {
      if (isEditing) {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/journal/${currentEntry._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchEntries();
        setCurrentEntry({ title: "", content: "", date: new Date() });
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Error deleting journal entry: ", err);
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      if (
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()
      ) {
        return "current-date";
      }
    }
    return null;
  };

  return (
    <div className="journal-container">
      <div className="journal-card">
        <h2>Journal</h2>
        <input
          type="text"
          name="title"
          className="journal-title"
          value={currentEntry.title}
          onChange={handleInputChange}
          placeholder="Title"
        />
        <textarea
          name="content"
          className="journal-content"
          value={currentEntry.content}
          onChange={handleInputChange}
          placeholder="Start writing your thoughts for the day..."
          rows="10"
        />
        <div>
          <button onClick={handleSave}>{isEditing ? "Update" : "Save"}</button>
          {isEditing && <button onClick={handleDelete}>Delete</button>}
        </div>
      </div>
      <div className="right-part">
        <div className="calendar-card">
          <h2>Calendar</h2>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileClassName={tileClassName}
            tileContent={({ date }) =>
              entries.some((e) => new Date(e.date).toDateString() === date.toDateString()) ? (
                <FontAwesomeIcon icon={faCheck} />
              ) : null
            }
          />
        </div>
        <div className="quote-card">
          <p>
            "<i>{quote}</i>"
          </p>
          <button onClick={fetchQuote}>New Quote</button>
        </div>
      </div>
    </div>
  );
};

export default Journal;
