<template>
  <div class="flex">
    <div class="w-1/5 bg-slate-900 p-4">Nada por aqui ainda...</div>

    <div class="w-2/3 p-4 shadow-md">
      <div v-for="transaction in transactions">
        <div
          v-if="$dayjs(transaction.date).isBefore($dayjs().add(2, 'days'))"
          class="flex justify-start"
        >
          <!-- date -->
          <div class="text-center self-end min-w-fit pr-4">
            <span class="uppercase leading-3 text-sm text-gray-400 block"
              >{{ $dayjs(transaction.date).add(1, "day").format("MMM") }}
            </span>
            <span class="text-2xl text-gray-400">
              {{ $dayjs(transaction.date).add(1, "day").format("DD") }}
            </span>
          </div>

          <!-- description -->
          <div class="w-96">
            <span class="text-xl leading-7 block"
              >{{ transaction.description }}
              <UBadge v-if="transaction.reacurring" variant="outline">
                <UIcon
                  name="i-heroicons-outline-refresh"
                  class="mr-1"
                  dynamic
                />
                <span v-if="transaction.parcels > 0">
                  {{ transaction.currentParcel }} / {{ transaction.parcels }}
                </span>
                <span v-else> infinito </span>
              </UBadge>
            </span>
            <span class="text-sm text-gray-400">
              {{ transaction.account?.name }}
            </span>
          </div>

          <!-- amount -->
          <div class="flex self-center text-end ml-auto">
            <span
              class="text-xl"
              :class="`${
                transaction.account?.personId == 1
                  ? 'text-green-500'
                  : 'text-red-400'
              }`"
            >
              {{ transaction.amount.toFixed(2) }}
            </span>
            <UButtonGroup class="self-center pl-2">
              <UButton
                color="red"
                variant="soft"
                icon="i-heroicons-trash"
                @click="del(transaction.id)"
              ></UButton>
              <UButton
                @click="formTransaction?.edit(transaction)"
                icon="i-heroicons-pencil-square"
                trailing
              ></UButton>
            </UButtonGroup>
            <UCheckbox class="self-center pl-2" />
          </div>
        </div>
        <UDivider
          v-if="$dayjs(transaction.date).isBefore($dayjs().add(2, 'days'))"
          class="py-2"
          color="gray"
        />
      </div>

      <div class="flex justify-center mb-8">
        <div v-if="pending">Carregando...</div>
        <UButton
          v-else
          @click="loadMore()"
          icon="i-heroicons-arrow-down-tray"
          trailing
          >Carregar Mais</UButton
        >
      </div>
    </div>

    <div class="w-1/4 bg-slate-900 p-4">
      <UDivider label="AÇÕES" class="pb-4" />
      <CrudAddButton
        @add="formTransaction?.add"
        title="Cadastrar Transação"
        class="mb-2 w-full justify-center"
      />
      <CrudAddButton
        @add="formPayoff?.add"
        title="Quitar contas"
        class="mb-2 w-full justify-center"
      />

      <UDivider label="TOTAL" class="py-4" />
      <div v-for="projection in projections">
        {{ projection.person }}: R$ {{ projection.total.toFixed(2) }}
      </div>

      <UDivider label="RECORRÊNCIAS DO MÊS" class="py-4" />
      <div v-for="transaction in transactions">
        <div
          v-if="
            transaction.reacurring &&
            $dayjs(transaction.date).isAfter($dayjs().startOf('month'))
          "
          class="flex justify-start"
        >
          <!-- date -->
          <div class="text-center text-sm self-end min-w-fit pr-4">
            <span class="text-gray-400">
              {{ $dayjs(transaction.date).add(1, "day").format("DD") }}
            </span>
          </div>

          <!-- description -->
          <div class="w-96">
            <span class="text-sm leading-5 block text-gray-400"
              >{{ transaction.description }}
              <UBadge v-if="transaction.reacurring" variant="soft" size="xs">
                <span v-if="transaction.parcels > 0">
                  {{ transaction.currentParcel }} / {{ transaction.parcels }}
                </span>
                <span v-else>
                  <UIcon name="i-heroicons-outline-refresh" dynamic />
                </span>
              </UBadge>
            </span>
          </div>

          <!-- amount -->
          <div class="flex self-center text-end ml-auto text-sm text-gray-400">
            {{ transaction.amount.toFixed(2) }}
          </div>
        </div>
      </div>
      <div class="flex justify-between">
        <span>Total</span>
        <span>R$ {{ totalReacurring.toFixed(2) }}</span>
      </div>
    </div>
  </div>

  <FormTransaction ref="formTransaction" @refresh="refresh" />
  <FormPayoff ref="formPayoff" @refresh="refresh" />
</template>
<script setup>
const toast = useToast();
const dayjs = useDayjs();

const page = ref(1);
const transactions = ref([]);
const pending = ref(true);

onMounted(() => loadTransactions());

const loadMore = () => {
  page.value++;
  loadTransactions();
};

const loadTransactions = () => {
  pending.value = true;
  $fetch(`/api/`, {
    method: "GET",
    params: {
      page: page.value,
    },
  }).then(function (transactions) {
    appendTransactions(transactions.data);
    pending.value = false;
  });
};

const appendTransactions = (newTransactions) => {
  newTransactions.forEach((transaction) => {
    transactions.value.push(transaction);
  });
};

//const { pending, data: transactions } = await useLazyAsyncData(
//  "transactions",
//  () => {
//    return $fetch("/api/");
//  }
//);
const { data: projections } = await useLazyAsyncData("projections", () => {
  return $fetch("/api/transactions/projection");
});

const formTransaction = ref();
const formPayoff = ref();
async function refresh() {
  await refreshNuxtData("transactions");
  await refreshNuxtData("projections");
}

async function del(id) {
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
        title: "Erro ao excluir Transação.",
        description: error.value.message + "(" + error.value.statusCode + ")",
        icon: "i-heroicons-x-circle",
        color: "red",
      });
    }
  }
}

const totalReacurring = computed(() => {
  if (transactions?.value) {
    let sum = transactions.value
      .filter(
        (t) => t.reacurring && dayjs(t.date).isAfter(dayjs().startOf("month"))
      )
      .reduce((sum, t) => sum + t.amount, 0);
    console.log(sum);
    return sum;
  }
  return 0;
});
</script>
