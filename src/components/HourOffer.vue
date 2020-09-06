<template>
  <div>
    <p>Name: {{name}}</p>
    <p>From {{begindate}} to {{enddate}}</p>
  </div>
</template>


<script>
export default {
  name: "HourOffer",

  props: ["name", "begindate", "enddate"],
};
</script>