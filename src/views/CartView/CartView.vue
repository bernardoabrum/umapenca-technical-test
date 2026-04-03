<template>
  <div class="view cart-view">
    <div class="container-left">
      <div class="back-button">
        <Button @click="router.push('/shop')">
          <FontAwesomeIcon :icon="faArrowLeft" /> Continuar comprando
        </Button>
      </div>
      <h1 class="title">Finalização do pedido</h1>
      <form class="order-forms" @submit.prevent="completeOrder">
        <div class="contact">
          <h2 class="subtitle">Informações de contato</h2>
          <Input
            input-type="email"
            input-name="email"
            placeholder="seuemail@exemplo.com.br"
            :required="true"
            input-label="E-mail"
            maxlength="60"
            autocomplete="email"
            v-model="form.email"
            @blur="handleBlur('email')"
            :is-empty="emptyFields.email"
          />
          <Input
            input-type="tel"
            input-name="phone"
            placeholder="(00) 00000-0000"
            :required="true"
            input-label="Telefone"
            input-mask="(##) #####-####"
            autocomplete="tel"
            v-model="form.phone"
            @blur="handleBlur('phone')"
            :is-empty="emptyFields.phone"
          />
        </div>
        <div class="delivery">
          <h2 class="subtitle">Informações de entrega</h2>
          <div class="cep-container">
            <Input
              input-name="cep"
              placeholder="00000-000"
              :required="true"
              input-label="CEP"
              input-mask="#####-###"
              autocomplete="postal-code"
              v-model="form.cep"
              @blur="handleBlur('cep')"
              :is-empty="emptyFields.cep"
            />
            <Button
              @click="searchCEP"
              button-type="button"
              :is-loading="isSearchingCep"
              ><FontAwesomeIcon :icon="faMagnifyingGlass"
            /></Button>
          </div>
          <Input
            input-name="street"
            placeholder="Rua"
            :required="true"
            input-label="Rua"
            maxlength="60"
            autocomplete="address-line1"
            v-model="form.street"
            @blur="handleBlur('street')"
            :is-empty="emptyFields.street"
          />
          <Input
            input-name="city"
            placeholder="Cidade"
            :required="true"
            input-label="Cidade"
            maxlength="30"
            autocomplete="address-level2"
            v-model="form.city"
            @blur="handleBlur('city')"
            :is-empty="emptyFields.city"
          />
          <Input
            input-name="neighborhood"
            placeholder="Bairro"
            :required="true"
            input-label="Bairro"
            maxlength="30"
            autocomplete="address-level3"
            v-model="form.neighborhood"
            @blur="handleBlur('neighborhood')"
            :is-empty="emptyFields.neighborhood"
          />
          <Input
            input-name="state"
            placeholder="Estado"
            :required="true"
            input-label="Estado"
            maxlength="30"
            autocomplete="address-level1"
            v-model="form.state"
            @blur="handleBlur('state')"
            :is-empty="emptyFields.state"
          />
        </div>
        <div class="payment">
          <h2 class="subtitle">Informações de pagamento</h2>
          <Input
            input-name="cardNumber"
            placeholder="0000 0000 0000 0000"
            :required="true"
            input-label="Número do cartão"
            input-mask="#### #### #### ####"
            autocomplete="cc-number"
            v-model="form.cardNumber"
            @blur="handleBlur('cardNumber')"
            :is-empty="emptyFields.cardNumber"
          />
          <Input
            input-name="cardHolder"
            placeholder="Nome completo"
            :required="true"
            input-label="Titular do cartão"
            maxlength="30"
            autocomplete="cc-name"
            v-model="form.cardHolder"
            @blur="handleBlur('cardHolder')"
            :is-empty="emptyFields.cardHolder"
          />
          <Input
            input-name="cardExpiration"
            placeholder="MM/AA"
            :required="true"
            input-label="Data de vencimento"
            input-mask="##/##"
            autocomplete="cc-exp"
            v-model="form.cardExpiration"
            @blur="handleBlur('cardExpiration')"
            :is-empty="emptyFields.cardExpiration"
          />
          <Input
            input-name="cardCVC"
            placeholder="000"
            :required="true"
            input-label="CVC"
            input-mask="###"
            autocomplete="c-c-c-sc"
            v-model="form.cardCVC"
            @blur="handleBlur('cardCVC')"
            :is-empty="emptyFields.cardCVC"
          />
        </div>
        <div class="finish-button">
          <Button
            button-text="Concluir pedido"
            button-type="submit"
            :is-loading="isSendingForm"
          />
        </div>
      </form>
    </div>
    <div class="container-right">
      <h2 class="bag-title">Sua sacola</h2>
      <div class="bag-container">
        <p v-if="bagEmpty">Você ainda não adicionou nenhum item!</p>
        <div class="product-container">
          <div class="product" v-for="item in items" :key="item.id">
            <div class="image">
              <img :src="item.image" :alt="item.title" />
            </div>
            <div class="description">
              <div>
                <p class="title">{{ item.title }}</p>
                <p class="price">R$ {{ item.price }}</p>
              </div>
              <div class="quantity">
                <p class="title">Quantidade</p>
                <div class="setter">
                  <button
                    @click="setQuantity({ id: item.id, action: 'decrease' })"
                  >
                    <FontAwesomeIcon :icon="faMinus" />
                  </button>
                  <p class="number">{{ item.quantity }}</p>
                  <button
                    @click="setQuantity({ id: item.id, action: 'increase' })"
                  >
                    <FontAwesomeIcon :icon="faPlus" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="total">
        Total: R$ {{ !bagEmpty ? totalValue.toFixed(2) : "00,00" }}
      </p>
    </div>
    <ModalSucess v-if="showSucessModal" @close="newOrder" />
  </div>
</template>

<script setup>
import "./CartView.less";
import { Input, Button, ModalSucess } from "@/components";
import { useStore } from "@/store";
import { computed, reactive, ref, onMounted, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faMagnifyingGlass,
  faArrowLeft,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { states } from "@/utils/states";
import cep from "cep-promise";
import router from "@/router";

const { getShoppingCart, setQuantity } = useStore();
const items = computed(() => getShoppingCart());
const isSearchingCep = ref(false);
const isSendingForm = ref(false);
const showSucessModal = ref(false);

const form = reactive({
  email: "",
  phone: "",
  cep: "",
  street: "",
  city: "",
  neighborhood: "",
  state: "",
  cardNumber: "",
  cardHolder: "",
  cardExpiration: "",
  cardCVC: "",
});

const emptyFields = reactive({
  email: false,
  phone: false,
  cep: false,
  street: false,
  city: false,
  neighborhood: false,
  state: false,
  cardNumber: false,
  cardHolder: false,
  cardExpiration: false,
  cardCVC: false,
});

onMounted(() => {
  const savedForm = localStorage.getItem("checkoutForm");
  if (savedForm) {
    Object.assign(form, JSON.parse(savedForm));
  }
});

const totalValue = computed(() => {
  return items.value.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
});

const bagEmpty = computed(() => {
  return !getShoppingCart().length;
});

watch(
  form,
  (newVal) => {
    localStorage.setItem("checkoutForm", JSON.stringify(newVal));
  },
  { deep: true },
);

const completeOrder = () => {
  if (bagEmpty.value) {
    alert("Você não adicionou nenhum item ao carrinho.");
    return;
  }

  isSendingForm.value = true;
  setTimeout(() => {
    showSucessModal.value = true;
    console.log("Pedido feito!");
    isSendingForm.value = false;
    localStorage.removeItem("checkoutForm");
    localStorage.removeItem("shoppingCart");
  }, 1000);
};

const handleBlur = (field) => {
  emptyFields[field] = !form[field];
};

const newOrder = () => {
  window.location.reload();
};

const searchCEP = async () => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  try {
    if (!form.cep) return;

    const cleanCep = form.cep.replace(/\D/g, "");
    if (cleanCep.length !== 8) return;

    isSearchingCep.value = true;

    await delay(500);

    const data = await cep(cleanCep);

    form.street = data.street;
    form.city = data.city;
    form.neighborhood = data.neighborhood;
    form.state = states[data.state];
  } catch (error) {
    console.error("Error searching postal code: ", error);
    emptyFields.cep = true;
  } finally {
    isSearchingCep.value = false;
  }
};
</script>
