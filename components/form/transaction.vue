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
        <h2>Adicionar Transação</h2>
      </template>
      <UForm :validate="validate" :state="state" @submit="save">
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
        <UFormGroup label="Conta" name="account" class="mb-4">
          <USelectMenu
            v-model="selectedAccount"
            :searchable="searchAccount"
            searchable-placeholder="Pesquisar Conta"
          >
            <template #label>
              {{ selectedAccount.label }}
            </template>
          </USelectMenu>
        </UFormGroup>
        <UFormGroup label="Data" name="date" class="mb-4 flex-1">
          <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton
              icon="i-heroicons-calendar-days-20-solid"
              :label="$dayjs(state.date).format('DD/MM/YYYY')"
            />
            <template #panel="{ close }">
              <DatePicker v-model="state.date" @close="close" />
            </template>
          </UPopover>
        </UFormGroup>
        <UFormGroup label="Valor" name="amount" class="mb-4 flex-1">
          <UInput v-model="state.amount" />
        </UFormGroup>
        <div class="flex">
          <UFormGroup label="Recorrente" name="reacurring" class="mb-4 flex-1">
            <UCheckbox v-model="state.reacurring" />
          </UFormGroup>
          <UFormGroup
            v-if="state.reacurring"
            label="Parcelas"
            name="parcels"
            class="mb-4 flex-1"
          >
            <UInput v-model="state.parcels" />
          </UFormGroup>
        </div>

        <UFormGroup label="Descrição" name="description" class="mb-4">
          <UInput v-model="state.description" />
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

const searchAccount = async (q: any) => {
  const accounts = await $fetch("/api/accounts", { params: { q } });
  return accounts
    .map((account: { id: any; name: string }) => ({
      id: account.id,
      label: account.name,
    }))
    .filter(Boolean)
    .sort((a, b) => {
      if (a.label.toLowerCase() > b.label.toLowerCase()) return 1;
      else if (a.label.toLowerCase() < b.label.toLowerCase()) return -1;
      else return 0;
    });
};
const selectedAccount = ref({});
const searchPerson = async (q: any) => {
  const persons = await $fetch("/api/persons", { params: { q } });
  return persons
    .map((person: { id: any; name: string }) => ({
      id: person.id,
      label: person.name,
    }))
    .filter(Boolean)
    .sort((a, b) => {
      if (a.label.toLowerCase() > b.label.toLowerCase()) return 1;
      else if (a.label.toLowerCase() < b.label.toLowerCase()) return -1;
      else return 0;
    });
};
const selectedPerson = ref({});
const state = ref({
  id: undefined,
  date: undefined,
  amount: undefined,
  reacurring: false,
  parcels: undefined,
  description: undefined,
});
const validate = (state: any): FormError[] => {
  const errors: FormError[] = [];
  if (!selectedAccount?.value?.id)
    errors.push({ path: "account", message: "Selecione uma Conta" });
  if (!selectedPerson?.value?.id)
    errors.push({ path: "person", message: "Selecione uma Pessoa" });
  if (!state.date)
    errors.push({ path: "date", message: "Informe a Data da Transação" });
  if (!state.amount)
    errors.push({ path: "amount", message: "Informe o Valor" });
  if (!state.description)
    errors.push({ path: "description", message: "Informe a Descrição" });
  if (state.reacurring) {
    if (!state.parcels) {
      errors.push({
        path: "parcels",
        message: "Informe a Qtde de Parcelas, ou -1 para mensalidade sem fim",
      });
    }
  }
  return errors;
};

function add(
  personId: number,
  personLabel: string,
  accountId: number,
  accountLabel: string
) {
  state.value.id = undefined;
  if (accountId) {
    selectedAccount.value = { label: accountLabel, id: accountId };
  } else {
    selectedAccount.value = { label: "Selecione...", id: 0 };
  }
  if (personId) {
    selectedPerson.value = { label: personLabel, id: personId };
  } else {
    selectedPerson.value = { label: "Selecione...", id: 0 };
  }
  state.value.date = new Date();
  state.value.amount = undefined;
  state.value.description = undefined;
  state.value.reacurring = false;
  state.value.parcels = undefined;
  isOpen.value = true;
}

function edit(row: any) {
  state.value.id = row.id;
  selectedAccount.value = {
    id: row.account.id,
    label: row.account.name,
  };
  selectedPerson.value = {
    id: row.person.id,
    label: row.person.name,
  };
  state.value.date = row.date;
  state.value.amount = row.amount;
  state.value.description = row.description;
  state.value.reacurring = row.reaccuring;
  state.value.parcels = row.parcels;
  isOpen.value = true;
}

async function save(event: FormSubmitEvent<any>) {
  console.log("transaction save");
  const { data: result, error } = useFetch("/api/transactions", {
    method: "POST",
    body: JSON.stringify({
      id: state.value.id,
      person: selectedPerson.value.id,
      account: selectedAccount.value.id,
      date: state.value.date,
      amount: state.value.amount,
      description: state.value.description,
      reacurring: state.value.reacurring,
      parcels: state.value.parcels,
    }),
  });

  if (!error.value) {
    if (state.value.id) {
      toast.add({
        title: "Transação atualizada com sucesso",
        icon: "i-heroicons-check-circle",
      });
    } else {
      toast.add({
        title: "Transação cadastrada com sucesso",
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
