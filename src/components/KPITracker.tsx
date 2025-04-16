import React from 'react';

type KPI = {
  id: string;
  name: string;
  status: '✅ Complete' | '⏳ Active' | '☐ Pending';
  notes: string;
};

const kpiData: KPI[] = [
  {
    id: 'KPI_001',
    name: 'Keep Presence(1)',
    status: '✅ Complete',
    notes: 'Grounded self with start-of-day ritual',
  },
  {
    id: 'KPI_002',
    name: 'Keep Presence(2)',
    status: '⏳ Active',
    notes: 'Maintaining movement awareness',
  },
  {
    id: 'KPI_003',
    name: 'Keep Presence(3)',
    status: '☐ Pending',
    notes: 'Scheduled for tomorrow(3)',
  },
];

export default function KPITracker() {
  return (
    <section>
      <h2>🔁 Cycle-1 KPI Tracker — Keep Presence Series</h2>
      <p>Numerology Cycle: <strong>1 (Presence)</strong></p>
      <table>
        <thead>
          <tr>
            <th>KPI ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {kpiData.map(kpi => (
            <tr key={kpi.id}>
              <td>{kpi.id}</td>
              <td>{kpi.name}</td>
              <td>{kpi.status}</td>
              <td>{kpi.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
