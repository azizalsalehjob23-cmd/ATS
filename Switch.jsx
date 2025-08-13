export const Switch = ({checked=false, onCheckedChange=()=>{}, className=''}) => (
  <button type="button" aria-pressed={checked} className={`switch ${className}`} data-checked={checked} onClick={()=>onCheckedChange(!checked)}>
    <span className="knob" />
  </button>
);
