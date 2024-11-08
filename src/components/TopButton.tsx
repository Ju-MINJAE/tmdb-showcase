const TopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-3 rounded-full bg-gray-200 text-black hover:bg-gray-500 transition duration-300 shadow-lg"
    >
      Top
    </button>
  );
};

export default TopButton;
