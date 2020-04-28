const API_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api/v1/arduino/get'
    : 'https://live-gps-location.herokuapp.com/api/v1/arduino/get';
const API_URL_Latest =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api/v1/arduino/get-latest'
    : 'https://live-gps-location.herokuapp.com/api/v1/arduino/get-latest';

// export function getMessages() {
//     return fetch(API_URL)
//       .then(res => res.json())
//       .then(messages => {
//         const haveSeenLocation = {};
//         return messages.reduce((all, message) => {
//           // const key = `${message.latitude.toFixed(3)}${message.longitude.toFixed(3)}`;
//           // if (haveSeenLocation[key]) {
//           //   haveSeenLocation[key].otherMessages = haveSeenLocation[key].otherMessages || [];
//           //   haveSeenLocation[key].otherMessages.push(message);
//           // } else {
//           //   haveSeenLocation[key] = message;
//           //   all.push(message);
//           // }
//           return all;
//         }, []);
//       });
//   }

export function getLastLocation() {
  return fetch(API_URL_Latest).then((res) => res.json());
}

export function getMessages() {
  return fetch(API_URL).then((res) => res.json());
}

export function getLocation() {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        resolve(
          fetch('https://ipapi.co/json')
            .then((res) => res.json())
            .then((location) => {
              return {
                lat: location.latitude,
                lng: location.longitude,
              };
            })
        );
      }
    );
  });
}

export function sendMessage(message) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(message),
  }).then((res) => res.json());
}
