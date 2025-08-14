import React from 'react';
import Card from './Card';
import Button from './Button';

const stages = ["Applied", "Screening", "Interview", "Offer", "Hired", "Rejected"];

export default function Pipeline({ candidates }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {stages.map(stage => (
        <div key={stage}>
          <h3 className="font-semibold mb-2">{stage}</h3>
          {candidates.filter(c => c.stage === stage).map(c => (
            <Card key={c.id}>
              <p className="font-medium">{c.name}</p>
              <p className="text-sm">{c.email}</p>
              {c.resumeUrl && (
                <a href={c.resumeUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">Resume</a>
              )}
              <div className="flex flex-col gap-2 mt-2">
                {stages.filter(s => s !== stage).map(s => (
                  <Button key={s} variant="secondary">Move to {s}</Button>
                ))}
                <Button variant="danger">Delete</Button>
              </div>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}
