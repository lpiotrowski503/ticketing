import axios from 'axios';

export const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    return axios.create({
      // dev
      // baseURL:
      //   'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',

      // prod
      baseURL: 'http://www.ticketing-microservices.xyz',

      headers: req.headers,
    });
  } else {
    return axios.create({
      baseURL: '/',
    });
  }
};
