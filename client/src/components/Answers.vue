<template>
  <div>
    <div class="row" v-for="(answer, index) in answers" :key="index">
      <div class="col-md-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Answered by: {{ answer.by.name }}, {{ new Date(answer.created_at).toLocaleString() }}
              <span class="badge badge-success">
                <span class="glyphicon glyphicon-thumbs-up"></span>
                {{ answer.votes }}
              </span>
            </h3>
          </div>
          <div class="panel-body">
            {{ answer.content }}
          </div>
          <div class="panel-footer">
            <a href="#" class="btn btn-primary">
              <span class="glyphicon glyphicon-thumbs-up"></span>
            </a>
            <a href="#" class="btn btn-danger">
              <span class="glyphicon glyphicon-thumbs-down"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['answers'],
  }
</script>

<style></style>
