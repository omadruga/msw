<template>
  <div>
    <div class="flex gap-3 align-middle items-center">
      <CrudMyTitle title="Transações" />
      <UInput placeholder="Filtrar" v-model="filter" />
      <USelectMenu
        v-model="selectedAccountFilter"
        :searchable="searchAccount"
        searchable-placeholder="Pesquisar Conta"
        @change="refresh"
      >
        <template #label>
          {{ selectedAccountFilterLabel }}
        </template>
      </USelectMenu>
      <UButtonGroup>
        <CrudRefreshButton @refresh="refresh" />
        <CrudAddButton @add="form?.add" />
      </UButtonGroup>
    </div>
    <UTable :rows="filteredTransactions" :columns="columns" :loading="pending">
      <template #empty-state>
        <div class="flex flex-col items-center justify-center py-6 gap-3">
          <span class="text-sm">Nenhuma Transação cadastrada</span>
          <CrudAddButton @add="form?.add" />
        </div>
      </template>
      <template #account-data="{ row }">
        <span>{{ row.account?.name }}</span>
      </template>
      <template #date-data="{ row }">
        <span>{{ $dayjs(row.date).format("DD/MM/YYYY") }}</span>
      </template>
      <template #actions-data="{ row }">
        <UButtonGroup>
          <UButton
            color="red"
            variant="soft"
            icon="i-heroicons-trash"
            @click="del(row.id)"
            >Excluir</UButton
          >
          <UButton
            @click="form?.edit(row)"
            icon="i-heroicons-pencil-square"
            trailing
            >Alterar</UButton
          >
        </UButtonGroup>
      </template>
    </UTable>
    <FormTransaction ref="form" @refresh="refresh" />
  </div>
</template>
<script setup lang="ts">
const toast = useToast();
const route = useRoute();
const form = ref();

const searchAccount = async (q: any) => {
  const accounts = await $fetch("/api/accounts", { params: { q } });
  return accounts
    .map((account: { id: any; person: { name: string } }) => ({
      id: account.id,
      label: person.name,
    }))
    .filter(Boolean)
    .sort((a: any, b: any) => {
      if (a.label.toLowerCase() > b.label.toLowerCase()) return 1;
      else if (a.label.toLowerCase() < b.label.toLowerCase()) return -1;
      else return 0;
    });
};
const selectedAccountFilter = ref({});
const selectedAccountFilterLabel = computed(() => {
  if (selectedAccountFilter.value.id) {
    return selectedAccountFilter.value.label;
  } else if (route.query.accountId) {
    return route.query.accountLabel;
  } else {
    return "Selecione...";
  }
});

async function del(id: String) {
  if (confirm("Excluir Transação?")) {
    const { data: result, error } = await useFetch("/api/transactions", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
    });
    if (!error.value) {
      toast.add({
        title: "Transação excluída com sucesso",
        icon: "i-heroicons-check-circle",
      });
      refresh();
    } else {
      toast.add({
        title: "Erro ao excluir Transação",
        description: error.value.message + "(" + error.value.statusCode + ")",
        icon: "i-heroicons-x-circle",
        color: "red",
      });
    }
  }
}

async function refresh() {
  await refreshNuxtData("transactions");
}

const filter = ref("");
const columns = [
  {
    key: "id",
    label: "ID",
    sortable: true,
  },
  {
    key: "account",
    label: "Conta",
    sortable: true,
  },
  {
    key: "date",
    label: "Data",
    sortable: true,
  },
  {
    key: "amount",
    label: "Valor",
    sortable: true,
  },
  {
    key: "description",
    label: "Descrição",
    sortable: true,
  },
  {
    key: "actions",
  },
];

const { pending, data: transactions } = await useLazyAsyncData(
  "transactions",
  () => {
    let query = { type: null, account: null };
    if (selectedAccountFilter.value?.id) {
      query.account = selectedAccountFilter.value.id;
    } else if (route.query.accountId) {
      query.account = route.query.accountId;
      selectedAccountFilter.value.id = route.query.accountId;
      selectedAccountFilter.value.label = route.query.accountLabel;
    }
    return $fetch("/api/transactions", { params: query });
  }
);
const filteredTransactions = computed(() => {
  if (!filter.value) {
    return transactions.value;
  }
  return transactions.value.filter((transaction: ArrayLike<unknown>) => {
    return Object.values(transaction).some((value) => {
      return String(value).toLowerCase().includes(filter.value.toLowerCase());
    });
  });
});
</script>
