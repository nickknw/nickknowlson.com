    $(document).ready(function() {

        // github

        $.getJSON('http://github.com/api/v2/json/repos/show/nickknw/?callback=?', function(repo_data) {

            var most_recent_repo = 0;
            $.each(repo_data.repositories, function(repo_counter) {
                if(repo_data.repositories[most_recent_repo].pushed_at < repo_data.repositories[repo_counter].pushed_at) {
                    most_recent_repo = repo_counter;
                }
            });

            var repo_name = repo_data.repositories[most_recent_repo].name

            $.getJSON('http://github.com/api/v2/json/commits/list/nickknw/'+repo_name+'/master/?callback=?', function(commit_data) {

                var most_recent_commit = 0;
                $.each(commit_data.commits, function(commit_counter) {
                    if(commit_data.commits[most_recent_commit].committed_date < commit_data.commits[commit_counter].committed_date) {
                        most_recent_commit = commit_counter;
                    }
                });

                var commit = commit_data.commits[most_recent_commit]

                $("#github_commit_message").replaceWith(
                '<div id="github_commit_message" style="display:none;">' +
                '<strong>nickknw/'+repo_name+': </strong>' + 
                commit.message + '<span class="indent faded">' +
                new Date(commit.committed_date).toDateString().slice(4) + 
                '</span></div>');

                $('#git_url').attr('href', 'http://github.com' + commit.url);
                $('#github_commit_message').fadeIn();
            });
        });

        // stackoverflow

        $.getJSON('http://api.stackoverflow.com/1.0/users/224354/answers/?jsonp=?', function(so_answer_data) {

            $.getJSON('http://api.stackoverflow.com/1.0/users/224354/questions/?jsonp=?', function(so_question_data) {

                var text="";
                url="http://www.stackoverflow.com/questions/";

                if(so_answer_data.answers[0].creation_date < so_question_data.questions[0].creation_date) {
                    text = '<div id="stack_overflow_activity" style="display:none;">' +
                    '<strong>Question: </strong>' +
                    so_question_data.questions[0].title + '<span class="indent faded">' +
                    new Date(so_question_data.questions[0].creation_date * 1000).toDateString().slice(4) +
                    '</span></div>';

                    url += so_question_data.questions[0].question_id;
                }
                else {
                    text = '<div id="stack_overflow_activity" style="display:none;">' +
                    '<strong>Answer: </strong>' +
                    so_answer_data.answers[0].title + '<span class="indent faded">' +
                    new Date(so_answer_data.answers[0].creation_date * 1000).toDateString().slice(4) +
                    '</span></div>';

                    url += so_answer_data.answers[0].question_id + '/' + 
                    so_answer_data.answers[0].answer_id + '#' + so_answer_data.answers[0].answer_id;
                }

                $("#stack_overflow_activity").replaceWith(text);
                $("#so_url").attr('href', url);
                $('#stack_overflow_activity').fadeIn();
            });
        });

        // twitter

        $.getJSON('http://twitter.com/status/user_timeline/nickknw.json?count=6&callback=?', function(twitter_data) {
            if(twitter_data && twitter_data[0]) {
                $("#twitter_text").replaceWith(
                '<div id="twitter_text" style="display:none;">' +
                twitter_data[0].text + '<span class="indent faded">' +
                new Date(twitter_data[0].created_at).toDateString().slice(4) +
                '</span></div>');
                $('#twitter_text').fadeIn();
            }
        });
    });

