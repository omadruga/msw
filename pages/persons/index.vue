<template>
  <div>
    <CrudHeader
      title="Pessoas Cadastradas"
      v-model="filter"
      @add="form?.add"
      @refresh="refresh"
    />
    <UTable :rows="filteredPersons" :columns="columns" :loading="pending">
      <template #empty-state>
        <div class="flex flex-col items-center justify-center py-6 gap-3">
          <span class="text-sm">Nenhuma Pessoa cadastrada</span>
          <CrudAddButton @add="form?.add" />
        </div>
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
            @click="form?.edit(row.id, row.name)"
            icon="i-heroicons-pencil-square"
            trailing
            >Alterar</UButton
          >
        </UButtonGroup>
      </template>
    </UTable>
    <FormPerson v-if="loggedIn" ref="form" @refresh="refresh" />
  </div>
</template>
<script setup lang="ts">
const { loggedIn, user, session, clear } = useUserSession();
const toast = useToast();
const form = ref();

async function del(id: String) {
  if (confirm("Excluir Pessoa?")) {
    const { data: result, error } = await useFetch("/api/persons", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
    });
    if (!error.value) {
      toast.add({
        title: "Pessoa excluída com sucesso",
        icon: "i-heroicons-check-circle",
      });
      refresh();
    } else {
      toast.add({
        title: "Erro ao excluir Pessoa.",
        description: error.value.message + "(" + error.value.statusCode + ")",
        icon: "i-heroicons-x-circle",
        color: "red",
      });
    }
  }
}

async function refresh() {
  await refreshNuxtData("persons");
}

const filter = ref("");
const columns = [
  {
    key: "id",
    label: "ID",
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
const { pending, data: persons } = await useLazyAsyncData("persons", () => {
  return $fetch("/api/persons");
});
const filteredPersons = computed(() => {
  if (!filter.value) {
    return persons.value;
  }
  return persons.value.filter((person: ArrayLike<unknown>) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(filter.value.toLowerCase());
    });
  });
});
</script>
