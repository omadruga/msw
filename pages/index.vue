<template>
  <div class="flex">
    <div class="w-1/5 bg-slate-900 p-4">Nada por aqui ainda...</div>

    <div class="w-2/3 p-4 shadow-md">
      <div v-for="transaction in transactions">
        <div class="flex justify-start">
          <!-- date -->
          <div class="text-center self-end min-w-fit pr-4">
            <span class="uppercase leading-3 text-sm text-gray-400 block"
              >{{ $dayjs(transaction.date).format("MMM") }}
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
                <UIcon name="i-heroicons-outline-refresh" dynamic />
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
                transaction.buyerId == 1 ? 'text-green-500' : 'text-red-400'
              }`"
            >
              R$ {{ transaction.amount.toFixed(2) }}
            </span>
            <UCheckbox class="self-center pl-4" />
          </div>
        </div>
        <UDivider class="py-2" color="gray" />
      </div>
    </div>

    <div class="w-1/4 bg-slate-900 p-4">
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
      <div v-for="projection in projections">
        {{ projection.person }}: R$ {{ projection.total.toFixed(2) }}
      </div>
    </div>
  </div>

  <FormTransaction ref="formTransaction" @refresh="refresh" />
  <FormPayoff ref="formPayoff" @refresh="refresh" />
</template>
<script setup>
const { pending, data: transactions } = await useLazyAsyncData(
  "transactions",
  () => {
    return $fetch("/api/");
  }
);
const { pendingProjection, data: projections } = await useLazyAsyncData(
  "projections",
  () => {
    return $fetch("/api/transactions/projection");
  }
);

const formTransaction = ref();
const formPayoff = ref();
async function refresh() {
  await refreshNuxtData("transactions");
  await refreshNuxtData("projections");
}
</script>
