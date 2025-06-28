import Link from 'next/link';

const ComingSoon = () => {
  return (
    <div className="max-w-md mx-auto p-4 mt-12 text-center">
      <h1 className="text-3xl font-bold mb-4">Coming Soon!</h1>
      <p className="text-lg text-gray-600 mb-2">We are currently working on our new website.</p>
      <p className="text-lg text-gray-600">
        In the meantime, you can visit our{' '}
        <Link href="/">
          <a className="text-blue-600 hover:text-blue-800">home page</a>
        </Link>{' '}
        for more information.
      </p>
    </div>
  );
};

export default ComingSoon;