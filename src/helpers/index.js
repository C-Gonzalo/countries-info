// Function to split data array on arrays of subarrays in order to make a pagination

export const splitResults = (OriginalArray, subarraySize) => {
  const subarrays = [];
  for (let i = 0; i < OriginalArray.length; i += subarraySize) {
    subarrays.push(OriginalArray.slice(i, i + subarraySize));
  }
  return subarrays;
};
