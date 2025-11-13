import React from 'react';

const PetBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Solid pastel gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-amber-50 to-green-50"></div>
      
      {/* Pet pattern overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54.758 10.365L48.67 7.257 42.583 10.365 45.69 4.278 42.582-1.81l6.087 3.108L54.758-1.81l-3.108 6.087zM.159 44.188a.5.5 0 0 0 .68.233L6 41.54l5.161 2.882a.5.5 0 0 0 .68-.233l2.882-5.161a.5.5 0 0 0-.233-.68L7.507 35.5l5.161-2.882a.5.5 0 0 0 .233-.68l-2.882-5.161a.5.5 0 0 0-.68-.233L6 29.46l-5.161-2.882a.5.5 0 0 0-.68.233l-2.882 5.161a.5.5 0 0 0 .233.68L3.493 35.5l-5.161 2.882a.5.5 0 0 0-.233.68l2.882 5.161zM54.758 41.365L48.67 38.257l-6.087 3.108 3.108-6.087-3.108-6.087 6.087 3.108 6.087-3.108-3.108 6.087 3.108 6.087z\' fill=\'%23F8BBD0\' fill-opacity=\'0.6\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
        backgroundSize: '60px 60px',
        backgroundRepeat: 'repeat'
      }}></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-[15%] w-24 h-24 rounded-full bg-pink-100/50 blur-xl"></div>
      <div className="absolute bottom-1/4 right-[15%] w-32 h-32 rounded-full bg-amber-100/50 blur-xl"></div>
      <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full bg-green-100/50 blur-xl"></div>
    </div>
  );
};

export default PetBackground;
