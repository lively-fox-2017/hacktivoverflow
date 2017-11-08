<template>
<div class="list-group">
 <div class="list-group-item list-group-item">
    <div class="col-md-12">
    <h4 class="list-group-item-heading">
    <span class="tag tag-default tag-pill float-xs-right">{{ answer.votes }} |</span>
    {{ answer.content }}
    </h4>
    <p class="list-group-item-text">
    {{ answer.answerCreator.username }}
    </p>
    <button>Upvote</button>
    <button @click.prevent="del(answer)">Delete</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['answer'],
  methods: {
    del (params) {
      console.log(params._id)
    }
  }
}
</script>