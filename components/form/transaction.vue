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
          <UFormGroup
            v-if="state.reacurring"
            label="Atual"
            name="currentParcel"
            class="mb-4 flex-1"
          >
            <UInput v-model="state.currentParcel" />
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

const state = ref({
  id: undefined,
  date: undefined,
  amount: undefined,
  reacurring: false,
  parcels: undefined,
  description: undefined,
  currentParcel: undefined,
});
const validate = (state: any): FormError[] => {
  const errors: FormError[] = [];
  if (!selectedAccount?.value?.id)
    errors.push({ path: "account", message: "Selecione uma Conta" });
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

function add(accountId: number, accountLabel: string) {
  state.value.id = undefined;
  if (accountId) {
    selectedAccount.value = { label: accountLabel, id: accountId };
  } else {
    selectedAccount.value = { label: "Selecione...", id: 0 };
  }
  state.value.date = new Date();
  state.value.amount = undefined;
  state.value.description = undefined;
  state.value.reacurring = false;
  state.value.parcels = undefined;
  state.value.currentParcel = undefined;
  isOpen.value = true;
}

function edit(transaction: any) {
  state.value.id = transaction.id;
  if (transaction.account) {
    selectedAccount.value = {
      id: transaction.account.id,
      label: transaction.account.name,
    };
  }
  state.value.date = transaction.date;
  state.value.amount = transaction.amount;
  state.value.description = transaction.description;
  state.value.reacurring = transaction.reacurring;
  state.value.parcels = transaction.parcels;
  state.value.currentParcel = transaction.currentParcel;
  isOpen.value = true;
}

async function save(event: FormSubmitEvent<any>) {
  console.log("transaction save");
  const { data: result, error } = useFetch("/api/transactions", {
    method: "POST",
    body: JSON.stringify({
      id: state.value.id,
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
