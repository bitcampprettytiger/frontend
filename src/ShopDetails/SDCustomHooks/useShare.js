import { useCallback } from 'react';
import useVendor from './useVendor';

const useShare = (vendorId) => {
  const { vendor, loading, error } = useVendor(vendorId);

  const shareToWeb = useCallback(() => {
    if (navigator.share) {
      if (!loading && vendor) {
        navigator.share({
          title: "[먹자취]",
          text: vendor.address,
<<<<<<< HEAD
          url: "https://192.168.0.240:1004/vendor/infoDetail/${vendorId}",
=======
          url: "https://mukjachi.site:6443/vendor/infoDetail/${vendorId}",
>>>>>>> dfbbd0f7aed48255a114d10846631cf192d41633
        });
      }
    } else {
      alert("Web Share API is not supported in this browser.");
    }
  }, [vendor, loading]);

  //   const shareToKakao = useCallback(() => {
  //     if (!loading && vendor) {
  //       Kakao.Share.sendCustom({
  //         templateId: 82775,
  //         templateArgs: {
  //           title: '[먹자취]',
  //           description: vendor.address,
  //         },
  //       });
  //     }
  //   }, [vendor, loading]);

  return {
    shareToWeb,
    // shareToKakao,
    loading,
    error,
  };
};

export default useShare;
