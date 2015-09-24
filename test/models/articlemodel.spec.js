var ArticleModel = require('../../models/articlemodel'),
    _ = require('underscore'),
    expect = require('chai').expect;

describe('ArticleModel', function() {
    var testArticle = {
        article: {
            title: 'test',
            tags: 'test, test,test',
            content: 'test content',
            interested: 0,
            notInterested: 0,
            published: false
        }
    };

    var failArticle = {
        article: {
            title: 'test',
            tags: 'test, test,test',
            content: 'test content',
            interested: 0,
            notInterested: 0,
            published: true
        }
    };

    var savedArticle;

    after(function(done) {
        ArticleModel.hardDelete(savedArticle._id, function(err) {
            if (err) {
                done(err);
            }

            done();
        });
    });

    describe('#save', function() {
        it('should fail to validate  if incomplete and publish is true', function(done) {
            ArticleModel.save(failArticle, '2222', function(err, article) {
                expect(err.length).to.eql(1);
                expect(err[0].name).to.equal('publishDate');
                done();
            });
        });

        it('should save a new article', function(done) {
            ArticleModel.save(testArticle, '11111', function(err, article) {
                if (err) {
                    done(err);
                }

                savedArticle = article;

                expect(article.article).to.equal(testArticle.article);
                done();
            });
        });

        it('should update an existing article', function(done) {
            savedArticle.article.content = '2222test';

            ArticleModel.save(savedArticle, '2222', function(err, article) {
                if (err) {
                    done(err);
                }

                expect(article.article.content).to.equal('2222test');
                expect(article.lastModifiedBy).to.equal('2222');
                done();

            });
        });
    });

    describe('#get', function() {
        it('should find an existing article', function(done) {
            ArticleModel.get(savedArticle._id, function(err, article) {
                if (err) {
                    done(err);
                }

                expect(article._id).to.equal(savedArticle._id);
                expect(article.article.title).to.equal(savedArticle.article.title);
                done();
            });
        });
    });


    describe('#find', function() {
        it('should find an existing article by user', function(done) {
            ArticleModel.find({
                author: savedArticle.author,
                revision: 1
            }, function(err, article) {
                if (err) {
                    done(err);
                }

                expect(article[0]._id).to.equal(savedArticle._id);
                expect(article[0].article.title).to.equal(savedArticle.article.title);
                done();
            });
        });
    });
});