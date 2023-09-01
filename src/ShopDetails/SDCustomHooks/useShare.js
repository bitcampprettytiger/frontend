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
          url: "https://27.96.135.75/vendor/infoDetail/${vendorId}",
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
