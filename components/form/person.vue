<template>
  <USlideover v-model="isOpen">
    <UCard
      class="flex flex-col flex-1"
      :ui="{
        body: { base: 'flex-1' },
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <h2>Adicionar Pessoa</h2>
      </template>
      <UForm :validate="validate" :state="state" @submit.prevent="save">
        <UFormGroup label="Nome" name="name" class="mb-4">
          <UInput v-model="state.name" />
        </UFormGroup>
        <UInput v-model="state.id" type="hidden" />

        <div class="flex justify-evenly mt-4">
          <UButton variant="soft" @click="isOpen = false">Cancelar</UButton>
          <UButton type="submit">Salvar</UButton>
        </div>
      </UForm>
    </UCard>
  </USlideover>
</template>
<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
const toast = useToast();
defineExpose({ add, edit });
const emit = defineEmits(["refresh"]);
const isOpen = ref(false);
const state = ref({
  id: undefined,
  name: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.name) errors.push({ path: "name", message: "Informe o nome" });
  return errors;
};

function add() {
  state.value.id = undefined;
  state.value.name = undefined;
  isOpen.value = true;
}

function edit(id: any, name: any) {
  state.value.id = id;
  state.value.name = name;
  isOpen.value = true;
}

async function save(event: FormSubmitEvent<any>) {
  const { data: result, error } = useFetch("/api/persons", {
    method: "POST",
    body: JSON.stringify({
      id: state.value.id,
      name: state.value.name,
    }),
  });
  if (!error.value) {
    if (state.value.id) {
      toast.add({
        title: "Pessoa atualizado com sucesso",
        icon: "i-heroicons-check-circle",
      });
    } else {
      toast.add({
        title: "Pessoa cadastrada com sucesso",
        icon: "i-heroicons-check-circle",
      });
    }
    emit("refresh");
    isOpen.value = false;
  } else {
    if (error.value?.statusCode == 422) {
      toast.add({
        title: "Pessoa já está sendo usado",
        icon: "i-heroicons-x-circle",
        color: "red",
      });
    }
  }
}
</script>
