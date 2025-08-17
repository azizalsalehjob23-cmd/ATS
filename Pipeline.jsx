import React from 'react';
import Card from './Card';
import Button from './Button';
import { updateCandidate, deleteCandidate } from './api';

const STAGES = ["Applied","Screening","Interview","Offer","Hired","Rejected"];

export default function Pipeline({ candidates, onChange }) {

  async function move(id, stage) {
    await updateCandidate(id, { stage });
    onChange && onChange();
  }
  async function remove(id) {
    if (!confirm('Delete candidate?')) return;
    await deleteCandidate(id);
    onChange && onChange();
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {STAGES.map(stage => {
        const list = candidates.filter(c => c.stage === stage);
        return (
          <div key={stage}>
            <div className="font-semibold mb-2">{stage} <span className="text-sm opacity-70">({list.length})</span></div>
            <div className="space-y-2">
              {list.map(c => (
                <Card key={c.id}>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{c.name}</div>
                    <Button variant="secondary" onClick={()=>remove(c.id)}>Delete</Button>
                  </div>
                  <div className="text-sm opacity-80">{c.email}{c.phone ? ` · ${c.phone}` : ''}</div>
                  {c.resumeUrl && <a className="text-sm underline" href={c.resumeUrl} target="_blank" rel="noreferrer">Resume</a>}
                  {c.notes && <div className="text-sm mt-1">{c.notes}</div>}
                  <div className="flex gap-2 flex-wrap mt-2">
                    {STAGES.filter(s=>s!==c.stage).map(s => (
                      <Button key={s} variant="secondary" onClick={()=>move(c.id, s)}>Move to {s}</Button>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
