<script>
import Card from './Card.vue';
import ProfilePicture from './ProfilePicture.vue';

export default {
  components: {
    Card,
    ProfilePicture
  },
  data() {
    return { 
      id: 0,
      user: {},
      path: ""
    };
  },
  created() {
    this.id = this.$route.params.id;
    fetch(`http://localhost:3000/users/${this.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json()) 
    .then(data => {
      this.user = data;
      this.path = this.user.path;
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  },
};
</script>

<template>
  <div class="container my-4 d-flex flex-column" id="ctx">
    <div class="row pt-3">
      <div class="col-md-4 d-flex flex-column align-items-stretch">
        <ProfilePicture :src="path" :alt="path" />
        <Card v-if="user.contacts" title="Contact">
          <ul>
            <li v-for="(contact, index) in user.contacts" :key="index">
              <strong>{{ contact.key }}</strong>: {{ contact.value }}
            </li>
          </ul>
        </Card>
        <Card v-if="user.resume?.skills" title="Skills">
          <ul>
            <li v-for="(skill, index) in user.resume.skills" :key="index">
              {{ skill.title }} - {{ skill.duration }}
            </li>
          </ul>
        </Card>
        <Card v-if="user.resume?.projects" title="Projects">
          <ul>
            <li v-for="(project, index) in user.resume.projects" :key="index">
              <strong>{{ project.title }}</strong>: {{ project.description }} ({{ project.year }})
            </li>
          </ul>
        </Card>
        <Card v-if="user.resume?.references" title="References">
          <ul>
            <li v-for="(reference, index) in user.resume.references" :key="index">
              <strong>{{ reference.name }}</strong>: {{ reference.title }}
            </li>
          </ul>
        </Card>
      </div>
      <div class="col-md-8 d-flex flex-column align-items-stretch">
        <Card v-if="user.sum" title="Summary">
          <p>{{ user.sum }}</p>
        </Card>
        <Card v-if="user.resume?.education" title="Education">
          <ul>
            <li v-for="(education, index) in user.resume.education" :key="index">
              <strong>{{ education.institution }}</strong>: {{ education.degree }} ({{ education.years }})
            </li>
          </ul>
        </Card>
        <Card v-if="user.resume?.experience" title="Experience">
          <ul>
            <li v-for="(experience, index) in user.resume.experience" :key="index">
              <strong>{{ experience.company }}</strong>: {{ experience.role }} ({{ experience.duration }})
              <p>{{ experience.description }}</p>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  </div>
</template>

<style>
p { 
  margin: 0;
}
</style>
