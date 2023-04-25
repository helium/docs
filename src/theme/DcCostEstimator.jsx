import React, { useState } from 'react';

const OperationCostEstimator = () => {
  const [numberOfDevices, setNumberOfDevices] = useState(1);
  const [uplinkFrequency, setUplinkFrequency] = useState(12);
  const [frequencyUnit, setFrequencyUnit] = useState('timesPerHour');
  const dataTransferCost = 0.00001;

  const handleNumberOfDevicesChange = (event) => {
    setNumberOfDevices(parseInt(event.target.value, 10));
  };

  const handleUplinkFrequencyChange = (event) => {
    setUplinkFrequency(parseFloat(event.target.value));
  };

  const handleFrequencyUnitChange = (event) => {
    setFrequencyUnit(event.target.value);
  };

  const calculateCost = () => {
    let uplinksPerDay;
    switch (frequencyUnit) {
      case 'timesPerMinute':
        uplinksPerDay = uplinkFrequency * 60 * 24;
        break;
      case 'timesPerHour':
        uplinksPerDay = uplinkFrequency * 24;
        break;
      case 'timesPerDay':
      default:
        uplinksPerDay = uplinkFrequency;
        break;
    }

    const dailyCost = numberOfDevices * uplinksPerDay * dataTransferCost;

    if (isNaN(dailyCost)) {
        return 0;
    }

    return {
      day: dailyCost,
      month: dailyCost * 30,
      year: dailyCost * 365,
    };
  };

  const cost = calculateCost();

  return (
    <div className='dc-calc'>
      <div className='dc-calc-input-group'>
        <label htmlFor="numberOfDevices">Number of Devices:</label>
        <input
          type="number"
          id="numberOfDevices"
          value={numberOfDevices}
          onChange={handleNumberOfDevicesChange}
        />
      </div>
      <div className='dc-calc-input-group'>
        <label htmlFor="uplinkFrequency">Message Frequency:</label>
        <div className='dc-calc-frequency-wrapper'>
            <input
            type="number"
            id="uplinkFrequency"
            value={uplinkFrequency}
            onChange={handleUplinkFrequencyChange}
            />
            <select id="frequencyUnit" value={frequencyUnit} onChange={handleFrequencyUnitChange}>
            <option value="timesPerMinute">Times per Minute</option>
            <option value="timesPerHour">Times per Hour</option>
            <option value="timesPerDay">Times per Day</option>
            </select>
        </div>
      </div>
      <div>
        <span className='dc-calc-table-title'>Data Cost Estimate:</span>
        <table className='dc-calc-table'>
          <thead>
            <tr>
              <th>Per Day</th>
              <th>Per Month</th>
              <th>Per Year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${cost.day.toFixed(5)}</td>
              <td>${cost.month.toFixed(2)}</td>
              <td>${cost.year.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OperationCostEstimator;
