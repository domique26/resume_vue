<template id="form">
  <Header></Header>
  <div class="container d-flex flex-column">
    <FormField>
      <input v-model="user.path" placeholder="Profile Picture Path" />
    </FormField>
    <FormField>
      <input v-model="user.first_name" placeholder="First Name*" />
      <input v-model="user.last_name" placeholder="Last Name*" />
    </FormField>
    <textarea class="mb-2" v-model="user.sum" placeholder="Add your bio"></textarea>

    <FormField>
      <input value="Email" readonly />
      <input v-model="email_value" placeholder=" Value* " />
      <button type="submit" @click="add_email">Add Email</button>
    </FormField>

    <FormField>
      <input v-model="contact_key" placeholder=" Key " />
      <input v-model="contact_value" placeholder=" Value " />
      <button type="submit" @click="add_contact">Add Contact</button>
    </FormField>

    <FormField v-if="user.contacts.length" v-for="(contact, index) in user.contacts" :key="index">
      <p>{{ contact.key }} - {{ contact.value }}</p>
      <button class="delete_field" @click="deleteField(user.contacts, index)">x</button>
    </FormField>

    <FormField>
      <input v-model="skill_title" placeholder=" Title " />
      <input v-model="skill_duration" placeholder=" Duration " />
      <button type="submit" @click="add_skill">Add Skill</button>
    </FormField>

    <FormField v-if="user.resume.skills.length" v-for="(skill, index) in user.resume.skills" :key="index">
      <p>{{ skill.title }} - {{ skill.duration }}</p>
      <button class="delete_field" @click="deleteField(user.resume.skills, index)">x</button>
    </FormField>

    <div class="field d-flex flex-column">
      <div class="d-flex flex-md-row flex-column">
        <input v-model="experience_company" placeholder=" Company " />
        <input v-model="experience_role" placeholder=" Role " />
        <input v-model="experience_duration" placeholder=" Duration " />
      </div>
      <textarea v-model="experience_description" placeholder=" Description "></textarea>
      <button type="submit" @click="add_experience">Add Experience</button>
    </div>

    <FormField v-if="user.resume.experience.length" v-for="(exp, index) in user.resume.experience" :key="index">
      <p>{{ exp.company }} - {{ exp.role }} ({{ exp.duration }})</p>
      <p>{{ exp.description }}</p>
      <button class="delete_field" @click="deleteField(user.resume.experience, index)">x</button>
    </FormField>

    <FormField>
      <input v-model="education_institution" placeholder=" Institution " />
      <input v-model="education_degree" placeholder=" Degree " />
      <input v-model="education_years" placeholder=" Years " />
      <button type="submit" @click="add_education">Add Education</button>
    </FormField>

    <FormField v-if="user.resume.education.length" v-for="(edu, index) in user.resume.education" :key="index">
      <p>{{ edu.institution }} - {{ edu.degree }} ({{ edu.years }})</p>
      <button class="delete_field" @click="deleteField(user.resume.education, index)">x</button>
    </FormField>

    <FormField>
      <input v-model="project_title" placeholder=" Title " />
      <input v-model="project_description" placeholder=" Description " />
      <input v-model="project_years" placeholder=" Years " />
      <button type="submit" @click="add_project">Add Project</button>
    </FormField>

    <FormField v-if="user.resume.projects.length" v-for="(proj, index) in user.resume.projects" :key="index">
      <p>{{ proj.title }} - {{ proj.description }} ({{ proj.year }})</p>
      <button class="delete_field" @click="deleteField(user.resume.projects, index)">x</button>
    </FormField>

    <FormField>
      <input v-model="ref_name" placeholder=" Name " />
      <input v-model="ref_title" placeholder=" Title " />
      <button type="submit" @click="add_ref">Add References</button>
    </FormField>

    <FormField v-if="user.resume.references.length" v-for="(ref, index) in user.resume.references" :key="index">
      <p>{{ ref.name }} - {{ ref.title }}</p>
      <button class="delete_field" @click="deleteField(user.resume.references, index)">x</button>
    </FormField>
  </div>

  <p>{{ user }}</p>
  <button class="final_button" @click="add_user"> ADD USER </button>
</template>
<script>
import FormField from './components/FormField.vue';
import Header from './components/Header.vue';
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      contact_key: "",
      contact_value: "",
      email_value: "",
      skill_title: "",
      skill_duration: "",
      experience_company: "",
      experience_role: "",
      experience_duration: "",
      experience_description: "",
      education_institution: "",
      education_degree: "",
      education_years: "",
      project_title: "",
      project_description: "",
      project_years: "",
      ref_name: "",
      ref_title: "",
      user: {
        path:"",
        first_name: "",
        last_name: "",
        sum: "",
        contacts: [],
        resume: {
          skills: [],
          experience: [],
          education: [],
          projects: [],
          references: []
        }
      }
    };
  },
  validations () {
    return {
      user: {
        first_name: { required },
        last_name: { required }
      },
      email_value: { email }
    }
  },
  methods: {
    async add_user() { 
      const dataToSave = Array.isArray(this.user) ? this.user : [this.user];
      const result = await this.v$.$validate()
      if (!result) {
        window.alert('User Form is invalid.');
        console.log('Invalid user form');
        return;
      }

      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSave)
      })
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
    },
    add_email() {
      this.v$.$touch()
      if (!this.v$.email_value.$invalid) {
        this.user.contacts.push({ key: "Email", value: this.email_value })
        this.email_value = '';
      } else {
        window.alert('Invalid Email!');
        this.email_value = '';
        console.log('Invalid email');
      }
    },
    add_ref() {
      this.user.resume.references.push({ name: this.ref_name, title: this.ref_title });
      this.ref_name = '';
      this.ref_title = '';
    },
    add_contact() {
      this.user.contacts.push({ key: this.contact_key, value: this.contact_value });
      this.contact_key = '';
      this.contact_value = '';
    },
    add_skill() {
      this.user.resume.skills.push({ title: this.skill_title, duration: this.skill_duration });
      this.skill_title = '';
      this.skill_duration = '';
    },
    add_experience() {
      this.user.resume.experience.push({
        company: this.experience_company,
        role: this.experience_role,
        duration: this.experience_duration,
        description: this.experience_description
      });
      this.experience_company = '';
      this.experience_role = '';
      this.experience_duration = '';
      this.experience_description = '';
    },
    add_education() {
      this.user.resume.education.push({
        institution: this.education_institution,
        degree: this.education_degree,
        years: this.education_years
      });
      this.education_institution = '';
      this.education_degree = '';
      this.education_years = '';
    },
    add_project() {
      this.user.resume.projects.push({
        title: this.project_title,
        description: this.project_description,
        year: this.project_years
      });
      this.project_title = '';
      this.project_description = '';
      this.project_years = '';
    },
    deleteField(array, index) {
      array.splice(index, 1);
    }
  },
  components: {
    FormField,
    Header
  }
};
</script>