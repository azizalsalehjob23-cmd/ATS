export const Button = ({className='', variant='primary', children, ...props}) => (
  <button className={`btn ${variant==='secondary'?'btn-secondary':''} ${className}`} {...props}>{children}</button>
);
