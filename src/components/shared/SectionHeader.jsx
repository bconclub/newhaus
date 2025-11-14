const SectionHeader = ({ smallText, headline, subtext, centered = false }) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {smallText && (
        <p className="text-nh-copper font-semibold text-sm tracking-wider uppercase mb-2">
          {smallText}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
        {headline}
      </h2>
      {subtext && (
        <p className={`text-gray-300 text-lg max-w-3xl ${centered ? 'mx-auto' : ''}`}>
          {subtext}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
