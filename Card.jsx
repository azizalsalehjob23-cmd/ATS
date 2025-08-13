export const Card = ({className='', children, ...props}) => (
  <div className={`card ${className}`} {...props}>{children}</div>
);
export const CardContent = ({className='', children, ...props}) => (
  <div className={`p-4 ${className}`} {...props}>{children}</div>
);
