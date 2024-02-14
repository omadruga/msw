<template>
  <div>
    <CrudHeader
      title="Contas Administradas"
      v-model="filter"
      @add="form?.add"
      @refresh="refresh"
    />
    <UTable :rows="filteredAccounts" :columns="columns" :loading="pending">
      <template #empty-state>
        <div class="flex flex-col items-center justify-center py-6 gap-3">
          <span class="text-sm">Nenhuma Conta cadastrada</span>
          <CrudAddButton @click="form?.add" />
        </div>
      </template>
      <template #person-data="{ row }">
        <span>{{ row.person.name }} </span>
      </template>
      <template #actions-data="{ row }">
        <UButtonGroup>
          <UButton
            v-if="loggedIn"
            color="red"
            variant="soft"
            icon="i-heroicons-trash"
            @click="del(row.id)"
            >Excluir</UButton
          >
          <UButton
            v-if="loggedIn"
            @click="form?.edit(row.id, row.person, row.name)"
            icon="i-heroicons-pencil-square"
            trailing
            >Alterar</UButton
          >
        </UButtonGroup>
      </template>
    </UTable>
    <FormAccount v-if="loggedIn" ref="form" @refresh="refresh" />
  </div>
</template>
<script setup lang="ts">
const { loggedIn, user, session, clear } = useUserSession();
const toast = useToast();
const form = ref();

async function del(id: String) {
  if (confirm("Excluir Conta?")) {
    const { data: result, error } = await useFetch("/api/accounts", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
    });
    if (!error.value) {
      toast.add({
        title: "Conta excluída com sucesso",
        icon: "i-heroicons-check-circle",
      });
      refresh();
    } else {
      toast.add({
        title: "Erro ao excluir Conta.",
        description: error.value.message + "(" + error.value.statusCode + ")",
        icon: "i-heroicons-x-circle",
        color: "red",
      });
    }
  }
}

async function refresh() {
  await refreshNuxtData("accounts");
}

const filter = ref("");
const columns = [
  {
    key: "id",
    label: "ID",
    sortable: true,
  },
  {
    key: "person",
    label: "Pessoa",
    sortable: true,
  },
  {
    key: "name",
    label: "Nome",
    sortable: true,
  },
  {
    key: "actions",
  },
];
const { pending, data: accounts } = await useLazyAsyncData("accounts", () => {
  return $fetch("/api/accounts");
});
const filteredAccounts = computed(() => {
  if (!filter.value) {
    return accounts.value;
  }
  return accounts.value.filter((account: ArrayLike<unknown>) => {
    return Object.values(account).some((value) => {
      return String(value).toLowerCase().includes(filter.value.toLowerCase());
    });
  });
});
</script>
