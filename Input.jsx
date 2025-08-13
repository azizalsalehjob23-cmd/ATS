export const Input = ({className='', ...props}) => <input className={`input ${className}`} {...props} />;
export const Textarea = ({className='', ...props}) => <textarea className={`textarea ${className}`} {...props} />;
export const Label = ({className='', children, ...props}) => <label className={`label ${className}`} {...props}>{children}</label>;
