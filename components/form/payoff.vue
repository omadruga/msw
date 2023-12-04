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
        <h2>Quitar contas</h2>
      </template>
      <UForm :validate="validate" :state="state" @submit="save">
        <div class="flex">
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
        </div>
        <UFormGroup label="Valor" name="amount" class="mb-4 flex-1">
          <UInput v-model="state.amount" />
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

const state = ref({
  id: undefined,
  date: undefined,
  amount: undefined,
});
const validate = (state: any): FormError[] => {
  const errors: FormError[] = [];
  if (!state.date)
    errors.push({ path: "date", message: "Informe a Data da Transação" });
  if (!state.amount)
    errors.push({ path: "amount", message: "Informe o Valor" });
  return errors;
};

function add() {
  state.value.id = undefined;
  state.value.date = new Date();
  state.value.amount = undefined;
  isOpen.value = true;
}

function edit(row: any) {
  state.value.id = row.id;
  state.value.date = row.date;
  state.value.amount = row.amount;
  isOpen.value = true;
}

async function save(event: FormSubmitEvent<any>) {
  const { data: result, error } = useFetch("/api/transactions/payoff", {
    method: "POST",
    body: JSON.stringify({
      id: state.value.id,
      date: state.value.date,
      amount: state.value.amount,
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
