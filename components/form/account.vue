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
        <h2>Adicionar Conta</h2>
      </template>
      <UForm :validate="validate" :state="state" @submit.prevent="save">
        <UFormGroup label="Pessoa" name="person" class="mb-4">
          <USelectMenu
            v-model="selectedPerson"
            :searchable="searchPerson"
            searchable-placeholder="Pesquisar Pessoa"
          >
            <template #label>
              {{ selectedPerson.label }}
            </template>
          </USelectMenu>
        </UFormGroup>
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
const form = ref();

const searchPerson = async (q: any) => {
  const persons = await $fetch("/api/persons", { params: { q } });
  return persons
    .map((person: { id: any; name: string }) => ({
      id: person.id,
      label: person.name,
    }))
    .filter(Boolean);
};
const selectedPerson = ref({ label: "Selecione...", id: 0 });

const state = ref({
  id: undefined,
  name: undefined,
});

const validate = (state: any): FormError[] => {
  const errors: FormError[] = [];
  if (!selectedPerson?.value?.id)
    errors.push({ path: "person", message: "Selecione uma Pessoa" });
  if (!state?.value?.name)
    errors.push({ path: "name", message: "Informe o Nome desta conta" });
  return errors;
};

function add(selectedPersonId: number, selectedPersonName: string) {
  state.value.id = undefined;
  state.value.name = undefined;
  selectedPerson.value.id = selectedPersonId;
  selectedPerson.value.label = selectedPersonName;
  isOpen.value = true;
}

function edit(id: any, person: any, name: any) {
  state.value.id = id;
  selectedPerson.value.id = person;
  state.value.name = name;
  isOpen.value = true;
}

async function save(event: FormSubmitEvent<any>) {
  const { data: result, error } = useFetch("/api/accounts", {
    method: "POST",
    body: JSON.stringify({
      id: state.value.id,
      person: selectedPerson.value.id,
      name: state.value.name,
    }),
  });
  if (!error.value) {
    if (state.value.id) {
      toast.add({
        title: "Conta atualizada com sucesso",
        icon: "i-heroicons-check-circle",
      });
    } else {
      toast.add({
        title: "Conta cadastrada com sucesso",
        icon: "i-heroicons-check-circle",
      });
    }
    emit("refresh");
    isOpen.value = false;
  } else {
    toast.add({
      title: error.value.message,
      description: error.value.statusMessage,
      icon: "i-heroicons-x-circle",
      color: "red",
    });
  }
}
</script>
