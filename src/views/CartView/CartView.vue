<template>
  <div class="view cart-view">
    <div class="container-left">
      <button>Continuar comprando</button>
      <h1>Finalização do pedido</h1>
      <form @submit.prevent="submitForm">
        <div class="contact">
          <h2>Informações de contato</h2>
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
          <h2>Informações de entrega</h2>
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
          <Input
            input-name="street"
            placeholder="Nome da rua"
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
          <h2>Informações de pagamento</h2>
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
          <button type="submit">Concluir pedido</button>
        </div>
      </form>
    </div>
    <div class="container-right">
      <div class="bag-container">
        <h2>Sua sacola</h2>
        <div class="product-container">
          <div class="product" v-for="item in items" :key="item.id">
            <div class="image">
              <img :src="item.image" :alt="item.title" />
            </div>
            <div class="description">
              <div>
                <p>{{ item.title }}</p>
                <p>R$ {{ item.price }}</p>
              </div>
              <div class="quantity">
                <p>Quantidade</p>
                <div class="setter">
                  <button
                    @click="setQuantity({ id: item.id, action: 'decrease' })"
                  >
                    -
                  </button>
                  <p>{{ item.quantity }}</p>
                  <button
                    @click="setQuantity({ id: item.id, action: 'increase' })"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p>Total: R$ {{ totalValue }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import "./CartView.less";
import { Input } from "@/components";
import { useStore } from "@/store";
import { computed, reactive } from "vue";

const { getShoppingCart, setQuantity } = useStore();
const items = computed(() => getShoppingCart());

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

const totalValue = computed(() => {
  return items.value.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
});

const submitForm = () => {
  console.log("Enviado");
};

const handleBlur = (field) => {
  emptyFields[field] = !form[field];
};
</script>
