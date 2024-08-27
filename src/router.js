import Form from '@/Form.vue';
import User from '@/User.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/users/:id',
    component: User
  },
  {
    path: '/form',
    component: Form
  },
  {
    path: '/',
    component: Form
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
