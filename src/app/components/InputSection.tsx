import { Search, Calendar, Upload, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';

export function InputSection({ onFetch }: { onFetch: (ccNumber: string, dateRange: string, file?: File) => void }) {
  const [ccNumber, setCcNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFetch = () => {
    if (ccNumber) {
      onFetch(ccNumber, format(selectedDate, 'dd MMMM yyyy'), uploadedFile || undefined);
    }
  };

  const handleMonthChange = (increment: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentMonth(newDate);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const getDaysInMonth = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = [];
    let day = startDate;

    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  };

  const days = getDaysInMonth();
  const currentYear = currentMonth.getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-700 mb-2">CC Number</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Enter CC Number"
                value={ccNumber}
                onChange={(e) => setCcNumber(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ focusRing: '2px solid #007BC9' }}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px rgba(0, 123, 201, 0.2)'}
                onBlur={(e) => e.target.style.boxShadow = ''}
              />
            </div>
          </div>

          <div className="flex-1 relative" ref={calendarRef}>
            <label className="block text-sm text-gray-700 mb-2">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <button
                type="button"
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 appearance-none bg-white cursor-pointer text-left"
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px rgba(0, 123, 201, 0.2)'}
                onBlur={(e) => e.target.style.boxShadow = ''}
              >
                {format(selectedDate, 'dd MMMM yyyy')}
              </button>
            </div>

            {showCalendar && (
              <div className="absolute top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10 w-96">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => handleMonthChange(-1)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft size={20} className="text-gray-600" />
                  </button>
                  <div className="flex items-center gap-2">
                    <select
                      value={currentMonth.getMonth()}
                      onChange={(e) => {
                        const newDate = new Date(currentMonth);
                        newDate.setMonth(parseInt(e.target.value));
                        setCurrentMonth(newDate);
                      }}
                      className="px-3 py-1 rounded-lg text-white"
                      style={{ backgroundColor: '#007BC9', border: 'none' }}
                    >
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                        <option key={month} value={index}>{month}</option>
                      ))}
                    </select>
                    <select
                      value={currentYear}
                      onChange={(e) => {
                        const newDate = new Date(currentMonth);
                        newDate.setFullYear(parseInt(e.target.value));
                        setCurrentMonth(newDate);
                      }}
                      className="px-3 py-1 rounded-lg text-white"
                      style={{ backgroundColor: '#007BC9', border: 'none' }}
                    >
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => handleMonthChange(1)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight size={20} className="text-gray-600" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-xs text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => {
                    const isSelected = isSameDay(day, selectedDate);
                    const isToday = isSameDay(day, new Date());
                    const isCurrentMonth = isSameMonth(day, currentMonth);

                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedDate(day);
                          setShowCalendar(false);
                        }}
                        className={`p-2 text-sm rounded-lg transition-colors ${
                          isSelected
                            ? 'text-white'
                            : isToday
                            ? 'bg-gray-100 text-gray-900'
                            : isCurrentMonth
                            ? 'text-gray-700 hover:bg-gray-100'
                            : 'text-gray-400 hover:bg-gray-50'
                        }`}
                        style={isSelected ? { backgroundColor: '#007BC9' } : {}}
                      >
                        {format(day, 'd')}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleFetch}
            className="px-8 py-3 rounded-lg text-gray-900 transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#FFE000' }}
            disabled={!ccNumber}
          >
            Fetch Data
          </button>

          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Upload size={20} />
              <span>{uploadedFile ? uploadedFile.name.slice(0, 15) + '...' : 'Upload Excel'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
