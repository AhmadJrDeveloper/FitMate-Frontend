import  { useEffect } from 'react';

const VismeForm = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static-bundles.visme.co/forms/vismeforms-embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="visme_d"
      data-title="Untitled Project"
      data-url="z4rw3dm1-untitled-project"
      data-domain="forms"
      data-full-page="false"
      data-min-height="500px"
      data-form-id="29401">
    </div>
  );
};

export default VismeForm;
